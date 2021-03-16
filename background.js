var tabId = NaN;
var rInfo = null;
var rTab = null;

function onResearchNote(info, tab){
    // Create a tab on first click of Research Note
    if (isNaN(tabId)){
        rInfo = info;
        rTab = tab;
        chrome.tabs.create({
            url : "tab.html",
            active: false,
        }, onTabCreated);
    }else{
        message = {
            text: info.selectionText,
            title: tab.title,
            url: tab.url.includes('chrome-extension') ? info.srcUrl : tab.url
        }
        chrome.tabs.sendMessage(tabId, message);
    }
}

function onTabCreated(tab){
    tabId = tab.id;
    console.log(tabId);
    firstTimeCreated();
}

function onTabClosed(tabid, removeInfo){
    if (tabid === tabId){
        tabId = NaN;
    }
}

function firstTimeCreated(){
    // Wait for 2 secs to start the tab
    setTimeout(()=>{
        message = {
            text: rInfo.selectionText,
            title: rTab.title,
            url: rTab.url.includes('chrome-extension') ? rInfo.srcUrl : rTab.url
        }
        chrome.tabs.sendMessage(tabId, message);
        // Make infos null for next clicks
        rInfo = null;
        rTab = null;
    }, 2000);
}

chrome.contextMenus.create({
    id: "research-note",
    title: "Research Note",
    contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener(onResearchNote);
chrome.tabs.onRemoved.addListener(onTabClosed);