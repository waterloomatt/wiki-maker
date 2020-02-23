package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"regexp"
)

// ArticleRepository contains a list of wiki pages
type ArticleRepository struct {
    repository map[string]string
}

// index displays a list of wiki pages.
func (repo *ArticleRepository) index(w http.ResponseWriter, r *http.Request) {
	titles := make([]string, 0, len(repo.repository))

	for title := range repo.repository {
		titles = append(titles, title)
	}

	json, err := json.Marshal(titles)
	if err != nil {
	    w.WriteHeader(http.StatusInternalServerError)
        return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(json)
}

// Show displays a wiki page if it exists.
func (repo *ArticleRepository) show(w http.ResponseWriter, r *http.Request, title string) {
	body, exists := repo.repository[title]

	if exists == false {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	w.Write([]byte(body))
}

// store will store a wiki page into the repository.
func (repo *ArticleRepository) store(w http.ResponseWriter, r *http.Request, title string) {

	_, exists := repo.repository[title]

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
	    w.WriteHeader(http.StatusInternalServerError)
        return
	}

	repo.repository[title] = string(body)

	status := http.StatusCreated
	if exists == true {
		status = http.StatusOK
	}

	w.WriteHeader(status)
	return
}

// ServeHTTP handles in the incoming request and calls the appropriate method.
func (repo *ArticleRepository) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	indexPath := regexp.MustCompile("^/articles/?$")
	articlePath := regexp.MustCompile("^/articles/(.*?)$")

	switch {
	case indexPath.MatchString(r.URL.Path):
		repo.index(w, r)
	case articlePath.MatchString(r.URL.Path):
		m := articlePath.FindStringSubmatch(r.URL.Path)

		if r.Method == http.MethodGet {
			repo.show(w, r, m[1])
		} else if r.Method == http.MethodPut {
			repo.store(w, r, m[1])
		}
	}
}

// main is the entry into the web server.
func main() {

    mux := http.NewServeMux()

    repository := &ArticleRepository{}
    repository.repository = make(map[string]string)

    mux.Handle("/articles/", repository)

	log.Fatal(http.ListenAndServe(":9090", mux))
}