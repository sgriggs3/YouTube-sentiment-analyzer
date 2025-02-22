from locust import HttpUser, task, between

class YouTubeSentimentUser(HttpUser):
    wait_time = between(1, 5)

    @task
    def fetch_comments(self):
        self.client.get("/comments?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ")

    @task
    def analyze_sentiment(self):
        self.client.post("/analyze", json={"comments": ["I love this video!", "This is the worst video ever."]})
