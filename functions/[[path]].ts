export function onRequest(context) {
    const url = new URL(context.request.url)
    
    if (url.endsWith(".pages.dev")) {
        return Response.redirect("https://mochamaple.cafe", 301)
    }
    
    return context.next()
}
