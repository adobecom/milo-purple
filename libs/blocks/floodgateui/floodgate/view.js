import { html, useEffect } from '../../../deps/htm-preact.js';
import { autoSetup, setup } from './index.js';
import { showLogin, heading, urls, serviceStatus, renderSignal } from '../utils/state.js';
import { account } from '../../../tools/sharepoint/state.js';
import Heading from '../heading/view.js';
import Actions from '../actions/view.js';
import Urls from '../urls/view.js';
import Status from '../status/view.js';
import Sync from '../sync/view.js';
import { ProjectStatus } from './projectStatus.js';

export default function Floodgate() {
  useEffect(() => { autoSetup(); }, []);
  if (!account.value.username) {
    return html`
      <h1>Milo Floodgate</h1>
      ${showLogin.value && html`
        <p>The login popup was blocked.<br/>Please use the button below.</p>
        <button class=fg-action onClick="${setup}">Open login</button>
      `}
    `;
  }
  
  return html`
    ${serviceStatus.value && html`<${Sync} />`}
    <h1>Milo Floodgate</h1>
    <div>${heading.value.editUrl && html`<${Heading} />`}</div>

    <div class=fgui-section>
      <div class=fgui-section-heading>
        <h2 class=fgui-section-label>PROJECT STATUS</h2>
      </div>
      <div key=${renderSignal.value}>
        <ul class=fgui-subprojects>
          <${ProjectStatus} action="copy" />
          <${ProjectStatus} action="promote" />
          <${ProjectStatus} action="delete" />
        </ul>
      </div>
    </div>

    <div>${urls.value.length > 0 && html`<${Actions} />`}</div>
    <div>${urls.value.length > 0 && html`<${Urls} />`}</div>
    <div><${Status} /></div>
  `;
}