package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Todo struct {
	ID          primitive.ObjectID   `bson:"_id,omitempty" json:"id"`
	UserID      string `bson:"user_id" json:"user_id"`
	Title       string `bson:"title" json:"title"`
	Description string `bson:"description" json:"description"`
	Done        bool   `bson:"done" json:"done"`
}