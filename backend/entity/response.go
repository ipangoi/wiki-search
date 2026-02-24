package entity

type ApiResponse struct {
	Query Query `json:"query"`
}

type Query struct {
	Searchinfo Searchinfo `json:"searchinfo"`
	Search     []Article  `json:"search"`
}

type Searchinfo struct {
	Totalhits int `json:"totalhits"`
}

type Article struct {
	Ns        int    `json:"ns"`
	Title     string `json:"title"`
	Pageid    int    `json:"pageid"`
	Size      int    `json:"size"`
	Wordcount int    `json:"wordcount"`
	Snippet   string `json:"snippet"`
	Timestamp string `json:"timestamp"`
}
