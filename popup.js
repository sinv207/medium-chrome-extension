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

// When the button is clicked, inject setPageBackgroundColor into current page
firstAidProxer.addEventListener('click', async () => {
    try {
        let queryOptions = { active: true, currentWindow: true }
        let [tab] = await chrome.tabs.query(queryOptions)

        // console.log({ tab })
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
