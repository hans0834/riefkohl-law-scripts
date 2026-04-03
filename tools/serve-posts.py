from http.server import HTTPServer, SimpleHTTPRequestHandler
import json

class CORSHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/posts':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            with open('remaining-posts-api.json', 'rb') as f:
                self.wfile.write(f.read())
        else:
            self.send_response(404)
            self.end_headers()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET')
        self.end_headers()

    def log_message(self, format, *args):
        pass  # Suppress output

server = HTTPServer(('127.0.0.1', 9876), CORSHandler)
print('Serving on http://127.0.0.1:9876/posts')
server.serve_forever()
