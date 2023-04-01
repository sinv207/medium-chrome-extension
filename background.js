let proxyHost = 'proxy.goenlab.com'

const is_debug = false

function isValidHttpUrl(string) {
    try {
        const newUrl = new URL(string)
        return newUrl.protocol === 'http:' || newUrl.protocol === 'https:'
    } catch (err) {
        return false
    }
}

chrome.runtime.onInstalled.addListener(function () {
    console.log('Wellcome to GoEN Proxy')
    chrome.contextMenus.create({
        id: 'firstAidProxer',
        title: 'GoEN Proxy: Open page in New Tab',
        contexts: ['page'],
    })
})

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     console.log({ tabId, changeInfo, tab })
//     if (tab.url && changeInfo.status) {
//         console.log({ tabId, changeInfo, tab })
//     }
// })

chrome.contextMenus.onClicked.addListener(async function (info, tab) {
    try {
        if (tab.url) {
            let url = new URL(tab.url)
            is_debug && console.log({ tab, url })

            if (url.hostname != proxyHost && isValidHttpUrl(url.href)) {
                let newUrl = new URL('https://' + proxyHost + url.pathname)
                newUrl.searchParams.set('origin', url.hostname)
                // console.log(newUrl)
                // chrome.tabs.update(tab.id, { url: your_new_url })
                chrome.tabs.create({ url: newUrl.href })
            }
        }
    } catch (error) {
        is_debug && console.trace(error)
    }
})
