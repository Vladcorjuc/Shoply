chrome.runtime.onInstalled.addListener(function() {
    /*chrome.contextMenus.create({
        "id": "sampleContextMenu",
        "title": "Sample Context Menu",
        "contexts": ["selection"]
    });*/

});

function createProductsPopup(searchedText) {

}

chrome.webNavigation.onCompleted.addListener(function() {
    alert("This is my favorite website!");
    chrome.tabs.getSelected(
        null,
        function (tab) {
            var queryDict = {};
            var urlArgs=tab.url.split('?');
            urlArgs[1].split("&")
                .forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]});
            console.log(queryDict);
            var searchedText=queryDict['q'];
            if(searchedText===null)
                searchedText=queryDict["oq"];
            if (searchedText) {
                createProductsPopup(searchedText);
                window.open("background_popup.html", "extension_popup",
                    "resizable=0,top=100,left=960,width=200,titlebar=no,menubar=no,toolbar=no,location=no,scrollbars=no,status=no,height=250,,directories=0,status=0");
            } else {
                return;
            }
        }
    );
}, {url: [{urlMatches : 'https://www.google.com/'}]});

