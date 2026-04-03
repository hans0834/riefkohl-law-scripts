#!/usr/bin/env python3
"""Simple HTTP server with CORS headers for local file serving."""
import http.server
import socketserver

class CORSHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET')
        super().end_headers()

PORT = 8092
with socketserver.TCPServer(("", PORT), CORSHandler) as httpd:
    print(f"Serving on port {PORT}")
    httpd.serve_forever()
