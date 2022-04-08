let proxyHost = 'medium.first-aid.tech'

chrome.runtime.onInstalled.addListener(function () {
    console.log('Wellcome to First Aid Proxer')
    chrome.contextMenus.create({
        id: 'firstAidProxer',
        title: 'Open with Fisrt Aid Proxer',
        contexts: ['page'],
    })
})

chrome.contextMenus.onClicked.addListener(async function (info, tab) {
    // console.log({ info, tab })
    if (tab.url) {
        let url = new URL(tab.url)
        console.log({ tab, url })

        if (url.hostname != proxyHost) {
            let newUrl = new URL('https://' + proxyHost + url.pathname)
            newUrl.searchParams.set('origin', url.hostname)
            // console.log(newUrl)
            // chrome.tabs.update(tab.id, { url: your_new_url })
            chrome.tabs.create({ url: newUrl.href })
        }
    }
})
