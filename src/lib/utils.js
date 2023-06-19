export const getPageNumberFromParams = (url) => {
    let page = 1
    const pageQueryParam = 'page='
    const pageIndex = url.indexOf(pageQueryParam)

    if (pageIndex !== -1) {
        const pageStartIndex = pageIndex + pageQueryParam.length
        const nextPageIndex = url.indexOf('&', pageStartIndex)

        const pageEndIndex = nextPageIndex !== -1 ? nextPageIndex : url.length
        page = parseInt(url.substring(pageStartIndex, pageEndIndex))
    }
    return page
}