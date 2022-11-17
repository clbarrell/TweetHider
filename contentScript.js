let n = 0;
let lastRun = Date.now();
const hideTweets = () => {
  if (Date.now() - lastRun < 2000) {
    return;
  }
  lastRun = Date.now();
  const tweets = document.querySelectorAll("[data-testid=tweet]");
  for (let t of tweets) {
    if (
      t.innerText.match(
        /mem it|@memdotai|unroll|Saved!|connect your Mem account|@readwise save|Readwise users|@NotionAddon|save thread|@SaveToNotion|saved to your Notion|@UnrollHelper|@threadreaderapp|@ZuperlyHQ/gi
      )
    ) {
      if (t.style.opacity != 0.25) {
        n += 1;
        t.style.height = "10px";
        t.style.opacity = 0.25;
        t.style.background = "#d1def1";
      }
    }
  }
  console.log(new Date().toLocaleTimeString(), "Hid tweets #", n);
};

hideTweets();

// Select the node that will be observed for mutations
const targetNode = document.body;

// Options for the observer (which mutations to observe)
const config = { attributes: false, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
      hideTweets();
    }
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

// Later, you can stop observing
// observer.disconnect();

//////
// const e = document.createElement('div');
// e.innerHTML = 'JavaScript DOM';
// const target = document.getElementsby... ('[data-testid=SideNav_AccountSwitcher_Button').parent
// target.appendChild(e);

// await fetch(chrome.runtime.getURL('/contentHtml.html')).then(r => r.text()).then(html => {
//   document.body.insertAdjacentHTML('beforeend', html);
//   // not using innerHTML as it would break js event listeners of the page
// });
