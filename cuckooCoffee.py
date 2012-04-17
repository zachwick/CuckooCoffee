#!/usr/bin/python2.7

"""
CuckooCoffee Online Ordering System Prototype

All images are Copyright Mairin Duffy (duffy@redhat.com)
All code is dual licensed under the GPLv3 and MIT licenses

"""

import web
import datetime

urls = (
    '/','Index',
    '/order','Order'
)

### Templates
t_globals = {
    'datestr':web.datestr,
}
render = web.template.render('templates',base='base',globals=t_globals)

class Index:
    def GET(self):
        """ Show the root page """
        return render.index()

class Order:
    def GET(self):
        """ Show the order page content """

app = web.application(urls,globals())

if __name__ == "__main__": app.run()
