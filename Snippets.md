## Code snippets

In This file I will be sharing some code snippets with nodeJS and mongoDB.

- Running db queries on an array of ids
- We need to use `Promise.all` to execute multiple find queries in parallel and wait for all of them to complete before returning the results.

    ```
        // Extracting emails from database and saving as an array
        const userEmails = await Promise.all(uniqueIds.map(async (id) => {
            const user =  await db.users.find({_id:ObjectId(id)}, {email:1}).toArray()
            return user[0].email
        } ))
    ```

- `Parallel Execution`: Without Promise.all, the queries would be executed sequentially, meaning each query would have to wait for the previous one to complete before starting. This can be very inefficient if you have multiple independent queries to execute, especially in a network-bound operation like database queries where there may be latency involved. By using Promise.all, you allow all the queries to be initiated simultaneously, taking full advantage of the available resources and potentially reducing the overall execution time.
- `Concurrency`: Modern JavaScript runtimes are capable of handling asynchronous operations concurrently. Using Promise.all helps you take advantage of this concurrency by allowing multiple database queries to be processed at the same time.
- `Improved Performance`: Parallel execution can significantly improve the performance of your application, especially in scenarios where you need to fetch data from a database or make multiple API calls. It can lead to faster response times and better resource utilization.
