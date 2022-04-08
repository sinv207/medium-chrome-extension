let proxyHost = 'medium.first-aid.tech'

// When the button is clicked, inject setPageBackgroundColor into current page
firstAidProxer.addEventListener('click', async () => {
    let queryOptions = { active: true, currentWindow: true }
    let [tab] = await chrome.tabs.query(queryOptions)

    // console.log({ tab })
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
