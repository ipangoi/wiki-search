package main

import (
	"go-search-engine/service"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	api := r.Group("/api")
	{
		api.GET("/search", func(ctx *gin.Context) {
			query := ctx.Query("q")
			offset := ctx.DefaultQuery("sroffset", "0")

			if query == "" {
				ctx.JSON(http.StatusBadRequest, gin.H{
					"error": "Query is required",
				})
				return
			}

			result, err := service.SearchWiki(query, offset)
			if err != nil {
				ctx.JSON(http.StatusInternalServerError, gin.H{
					"error": err.Error(),
				})
				return
			}

			ctx.JSON(http.StatusOK, gin.H{
				"message": "success",
				"data":    result,
			})
		})
	}

	r.Run(":8080")
}
