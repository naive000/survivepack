#!/usr/bin/env python3
"""本機預覽用靜態伺服器（只綁 127.0.0.1）。python3 -m http.server 的 listen 佇列只有 5，
網頁一次並行抓 16 個章節檔時會有請求被拒（瀏覽器顯示 Failed to fetch），這裡把佇列加大。
用法：python3 tools/serve.py [埠號，預設 8798]"""
import sys,os
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
class S(ThreadingHTTPServer):
    request_queue_size=128
    daemon_threads=True
port=int(sys.argv[1]) if len(sys.argv)>1 else 8798
S(('127.0.0.1',port),partial(SimpleHTTPRequestHandler,directory=ROOT)).serve_forever()
