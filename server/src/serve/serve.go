package serve

import (
	"net/http"

	"../config"
)

/*
IndexPage echo index.html
*/
func IndexPage(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, config.Cfg.StaticPath+"index.html")
}

/*
SW serve service worker javascript and avoid MIME type error
from browser have to add "Content-Type: application/javascript; charset=utf-8"
*/
func SW(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/javascript; charset=utf-8")
	http.ServeFile(w, r, config.Cfg.StaticPath+"sw.js")
}
