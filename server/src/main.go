package main

import (
	"runtime"

	"./exec"
)

func init() {
	runtime.GOMAXPROCS(runtime.NumCPU())
}

func main() {
	exec.Run()
}
