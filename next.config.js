/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        domains: [
            "oaidalleapiprodscus.blob.core.windows.net"
        ]
    }
}

module.exports = nextConfig
