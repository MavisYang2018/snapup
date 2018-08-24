package api

import (
	"net/http"
	"log"
	"io"
	"os"
	"../config"
	"../task"
	"bytes"
	"strconv"
)

const filename  = "Web-Snap-"

var (
	// create file path
	fnBuf *bytes.Buffer
)

func init() {
	fnBuf = new(bytes.Buffer)
}

//
// upload image to upload folder
//
func Upload (w http.ResponseWriter,r *http.Request) {

	// Access *
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// use multipart
	mr,err := r.MultipartReader()
	if err != nil {
		log.Panic(err)
	}

	// read file
	for {
		part,err := mr.NextPart()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Panic(err)
		}

		// file path
		fnBuf = new(bytes.Buffer)
		fnBuf.WriteString(config.Cfg.UploadPath)
		fnBuf.WriteString(filename)
		fnBuf.WriteString(strconv.Itoa(int( <- task.SeqChan)))
		fnBuf.WriteString(".png")

		//create or overrite file in web server
		f, err := os.OpenFile(fnBuf.String(), os.O_CREATE, 0777)
		if err != nil {
			log.Panic(err)
		}
		//write file to local
		_,err = io.Copy(f, part)
		if err != nil {
			log.Panic(err)
		}
		f.Close()

		// close part
		part.Close()
	}
}
