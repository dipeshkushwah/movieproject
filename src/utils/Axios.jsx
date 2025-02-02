import axios from 'axios'

const instance = axios.create({
    baseURL:"https://api.themoviedb.org/3",
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNzU3NTY0ODVjNjgwODE5MWRhZGQ3NzZhMDM0ZTFiNSIsIm5iZiI6MTcyOTMyNTQzNi4xMDg3MDQsInN1YiI6IjY3MGZhYWRmNTQ3ZGU0YTc0ZjYwZTU0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cfk7iSHr9FgKDDoH3ibs8waLaTO_7moUHmxfTtXznnU'
    }
})

export default instance;
