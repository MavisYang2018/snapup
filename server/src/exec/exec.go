package exec

import (
	"log"
	"net/http"

	"../api"
	"../config"

	"../serve"
	"github.com/gorilla/mux"
)

/*
Run web service
*/
func Run() {
	r := mux.NewRouter()
	r.HandleFunc("/", serve.IndexPage)         // echo index.html
	r.HandleFunc("/camera/upload", api.Upload) // upload
	r.HandleFunc("/sw.js", serve.SW)           // serve service worker

	// registry fileserver
	r.PathPrefix("/").
		Handler(http.StripPrefix("/",
			http.FileServer(http.Dir(config.Cfg.StaticPath))))

	log.Fatal(http.ListenAndServeTLS(config.Cfg.Port,
		config.Cfg.TLS.Cert,
		config.Cfg.TLS.Key,
		r))
}
