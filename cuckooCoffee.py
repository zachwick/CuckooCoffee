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
    '/order','Order',
    '/order_step2','Order2'
)

### Templates
t_globals = {
    'datestr':web.datestr,
}
render = web.template.render('templates',globals=t_globals)

class Index:
    def GET(self):
        """ Show the root page """
        return render.index()

class Order:
    def GET(self):
        """ Show the beginning of the order squence """
        return render.order()

class Order2:
    def GET(self):
        """ Show the 2nd step of the order process """
        return render.order2()

app = web.application(urls,globals())

if __name__ == "__main__": app.run()
