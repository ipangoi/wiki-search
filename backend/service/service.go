package service

import (
	"encoding/json"
	"go-search-engine/entity"
	"net/http"
	"net/url"
)

func SearchWiki(query string, offset string) (entity.ApiResponse, error) {
	baseURL := "https://en.wikipedia.org/w/api.php"
	params := url.Values{}
	params.Add("action", "query")
	params.Add("list", "search")
	params.Add("srsearch", query)
	params.Add("format", "json")
	params.Add("sroffset", offset)

	fullURL := baseURL + "?" + params.Encode()

	req, err := http.NewRequest("GET", fullURL, nil)
	if err != nil {
		return entity.ApiResponse{}, err
	}

	req.Header.Set("User-Agent", "WikiSearchEngine/1.0 (engelzimmer0@gmail.com)")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return entity.ApiResponse{}, err
	}
	defer resp.Body.Close()

	var apiResponse entity.ApiResponse

	if err := json.NewDecoder(resp.Body).Decode(&apiResponse); err != nil {
		return entity.ApiResponse{}, err
	}

	return apiResponse, nil
}
