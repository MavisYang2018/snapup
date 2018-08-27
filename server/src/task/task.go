package task

var (
	// file name seq channel
	SeqChan chan int64
)

var (
	// file name seq
	seq = int64(0)
)

func init() {
	SeqChan = make(chan int64,10)
	go ImgCounter()
}

func ImgCounter () {
	for {
		seq++
		SeqChan <- seq
	}
}
