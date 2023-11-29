addEventListener('fetch', event => {  
  event.respondWith(handleRequest(event.request))  
})  
  
async function handleRequest(request) {  
  const { pathname } = new URL(request.url)  
  
  // Check if the request is for the /secure path  
  if (pathname === '/secure') {  
    // Get user identity information  
    const email = request.headers.get('CF-Access-Authenticated-User-Email')  
    const timestamp = new Date().toLocaleString()  
    const country = request.headers.get('CF-IPCountry')  
  
    // Generate the response body  
    const responseBody = `${email} authenticated at ${timestamp} from <a href="https://pub-0dd3304029714e94bd9f8caf4a7a0fea.r2.dev/canadaflag.png">${country}</a>`  
  
    // Return the response as HTML  
    return new Response(responseBody, {  
      headers: { 'Content-Type': 'text/html' },  
    })  
  }  
  
  // Check if the request is for the /secure/{country} path  
  if (pathname.startsWith('/secure/')) {  
    const country = pathname.split('/').pop()  
  
// Get the flag asset from the private R2 bucket  
const flagResponse = await fetch(`https://pub-0dd3304029714e94bd9f8caf4a7a0fea.r2.dev/canadaflag.png`)  
const flagData = await flagResponse.arrayBuffer()  
  
// Return the flag asset with the appropriate content type  
return new Response(flagData, {  
  headers: { 'Content-Type': 'image/png' },  
})  
  
  }  
  
  // Return a 404 response for other paths  
  return new Response('Not found', { status: 404 })  
}  
