---
title: Write your own HTTP server from scratch using C
date: 2025-02-14
---
<div className="quote">
[Prerequisites] Basic C Programming
</div>

Ever wondered how websites actually work under the hood? You type a URL, hit enter, and boom a webpage appears. But what’s really happening behind the scenes? Well, at the heart of it all is something called an **HTTP server**, and today, we're going to **build one from scratch using C**.

Now, before you panic and think, _“C? Isn’t that the scary low-level language from the 70s?”_ - relax. I promise it’s not that bad.
<br/>
I'll assume you just saw the term **HTTP Server** and move forward with that assumption.

Before we dive right into the code, I want to explain few concepts that we are going to use in our code so that you don't feel lost and confused while reading.

I promise this is going to be an interesting one.
<br/>

---
## **What Even is an HTTP Server?**

HTTP (HyperText Transfer Protocol) server is a program that listens for requests from clients (like your browser), processes those requests, and sends back the requested data. Websites like Google, Facebook, and even this very blog are all powered by HTTP servers.
<br/>

---
## **How Does an HTTP Server Work?**

Here’s a simple breakdown:

-  A client (browser) sends an HTTP request.
-  The server reads the request and figures out what the client wants.
-  The server processes the request and prepares a response (like an HTML page or an image).
-  The server sends the response back to the client.
-  The browser renders the response, and you see a webpage!

That’s it! You’re using HTTP servers **every time** you visit a website or in general use the internet.
<br/>

---
## **What’s a Socket? Why Are We Using It?**

Sockets are how computers talk to each other over a network. They allow a **client and a server to send and receive data**, just like a phone call.

When you connect to a website, your browser **opens a socket** to the server. The server then listens for incoming requests through its socket and responds accordingly. If sockets didn’t exist, well… the internet wouldn’t either.
<br/>

---
## **What’s a Thread? Why Do We Need It?**

A thread is like an extra worker. Instead of handling **one** request at a time, our HTTP server will use **threads to handle multiple requests simultaneously**.
There's a lot more to threads, and it's a fascinating concept to dive into, but for now, it's beyond the scope of this blog post.
<br/>

---
## **What Happens When You Visit a Website?**

Let’s connect the dots! When you type `puang.in` into your browser:

- Your browser creates an **HTTP request** and sends it to the server.
- The server **reads the request**, looks for the requested page, and prepares a response.
-  The response is sent back to your browser.
- Your browser **renders** the response, and you see the webpage.

All of this happens **within milliseconds**, and that’s what makes the web feel so seamless.
<br/>

---
💻 That's all, lets start hacking!

---
## Headers Files
Before we dive in, I'll ask you to include all the necessary header file imports to prevent LSP from throwing annoying warnings. I know this list might seem overwhelming at first, but as we progress, I'll point out which functions come from which headers. This way, it'll be easier to keep track, and by the end, you'll see a concise list of the features we used and their corresponding headers.
```c
#include <arpa/inet.h>
#include <ctype.h>
#include <dirent.h>
#include <errno.h>
#include <fcntl.h>
#include <netinet/in.h>
#include <pthread.h>
#include <regex.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <unistd.h>
```

---
<br/>
Now lets define constants that we are going to use in our entire code base

```c
#define PORT 8080
#define BUFFER_SIZE 104857600
```

`PORT` - This defines the port number on which the server will listen for incoming connections.

`BUFFER_SIZE` (100MB) - Refers to the **amount of memory allocated for temporary storage** when processing data.

<br/>

---
<br/>

## Understanding `main()`

Now comes our `main()` function which basically sets up the server by creating a socket, configuring it with an IP address and port, and binding it to the system. It then listens for incoming connections and continuously accepts clients.

Each client is handled in a separate thread to allow multiple connections simultaneously. This ensures the server can process multiple requests efficiently while running indefinitely.
<br/>
Our final code for `main()` function is going to look like:

```c
int main (int argc, char *argv[]) {
  int server_fd;
  struct sockaddr_in server_addr;

  if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0) {
    perror("socket failed");
    exit(EXIT_FAILURE);
  }

  server_addr.sin_family = AF_INET;
  server_addr.sin_addr.s_addr = INADDR_ANY;
  server_addr.sin_port = htons(PORT);

  if (bind(server_fd, (struct sockaddr *)&server_addr, sizeof(server_addr)) < 0) {
    perror("bind failed");
    exit(EXIT_FAILURE);
  }

  if (listen(server_fd, 10) < 0) {
    perror("listen failed");
    exit(EXIT_FAILURE);
  }

  printf("Server listening on port %d\n", PORT);
  while (1) {
    struct sockaddr_in client_addr;
    socklen_t client_addr_len = sizeof(client_addr);
    int *client_fd = malloc(sizeof(int));

    if ((*client_fd = accept(server_fd, (struct sockaddr *)&client_addr, &client_addr_len)) < 0) {
      perror("accept failed");
      continue;
    }

    pthread_t thread_id;
    pthread_create(&thread_id, NULL, handle_client, (void *)client_fd);
    pthread_detach(thread_id);
  }
}
```

Lets go through this code one by one and understand each part of it in little depth.

```c
  int server_fd; // server file descriptor
  struct sockaddr_in server_addr;
```
Here `server_fd` is basically a unique identifier for the server. This is not going to change for the server and will remain the same throughout. We'll understand this better when I get to `client_fd` once.

Now we have `struct sockaddr_in server_addr` which is a structure from `<netinet/in.h>` that stores the server's address information (IP and port) and is used to configure the server socket.

```c
  // creating server socket
  if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0) {
    perror("socket failed");
    exit(EXIT_FAILURE);
  }
```
This creates a server socket using the `socket()` function. A socket is like a door that allows communication between computers. The parameters specify that it will use IPv4 (`AF_INET`), a reliable connection-oriented protocol (`SOCK_STREAM`, which means TCP), and `0` for the default protocol. If the socket creation fails, `perror()` prints an error message, and the program exits to prevent further issues.
```c
  // configure socket
  server_addr.sin_family = AF_INET; // always AF_INET for IPv4 (TCP/UDP)
  server_addr.sin_addr.s_addr = INADDR_ANY; // accept any connection from any IP
  server_addr.sin_port = htons(PORT); // assign a port to the socket
```
This part configures the server's address settings. It sets the address family to IPv4 (`AF_INET`), allows connections from any IP (`INADDR_ANY`), and assigns the specified port (`htons(PORT)`) to the socket.
```c
  // bind the socket to the port
  if (bind(server_fd, (struct sockaddr *)&server_addr, sizeof(server_addr)) < 0) {
    perror("bind failed");
    exit(EXIT_FAILURE);
  }
```
The `bind` function links the server socket to a specific IP address and port so it can receive incoming connections. It takes three arguments: the socket file descriptor (`server_fd`), a pointer to a `sockaddr` structure (`server_addr`), and the size of that structure. The `server_addr` contains details like the IP (`INADDR_ANY` allows connections from any address) and the port (`htons(PORT)`). If binding fails, it prints an error and exits.
This step is essential because, without binding, the server wouldn't know which network interface and port to listen on.
<br/>
The server itself is like a house with many possible entry points, but binding ensures that a specific door (socket) is attached to a known location so that clients know where to knock (connect).

```c
  // listen for incoming connections
  if (listen(server_fd, 10) < 0) {
    perror("listen failed");
    exit(EXIT_FAILURE);
  }
  printf("Server listening on port %d\n", PORT);
```
The `listen` function tells the server to start listening for incoming connection requests. It takes two arguments: the socket file descriptor (`server_fd`) and the maximum number of pending connections allowed in the queue (10 in this case). If a client tries to connect while the queue is full, their request will be rejected. If `listen` fails, an error is printed, and the program exits. This step is like opening the door and letting clients line up to enter.
<br/>
Okay now comes our **infinite while** loop of our HTTP server,  which continuously listens for client connections and handles them in separate threads. Let's break it down step by step.
```c
while(1) {
```
```c
	struct sockaddr_in client_addr;
	socklen_t client_addr_len = sizeof(client_addr);
	int *client_fd = malloc(sizeof(int));

    // accepting incoming client connection
    if ((*client_fd = accept(server_fd, (struct sockaddr *)&client_addr, &client_addr_len)) < 0) {
      perror("accept failed");
      continue;
    }
```
`client_addr`: Stores the **client’s IP address and port**.

`client_addr_len`: Stores the **size of the client address structure** (required by `accept()` function later).

`client_fd`: A **pointer to an integer** that will store the new socket file descriptor for the client.
#### Why do we use malloc in this case?
When a client connects, `accept()` returns a new file descriptor (`client_fd`) representing that connection. Instead of using a normal `int`, we allocate memory with `malloc()` so each client’s file descriptor persists even after the function ends. This ensures that when we pass `client_fd` to a new thread, it doesn’t get overwritten by the next connection. Think of it like giving each customer in a busy restaurant their own order slip instead of reusing the same one, so different clients don’t get mixed up.
<br/>
Now moving forward, `accept()` waits for a client to connect.
	 If a client connects:
	    - -> It creates a **new socket file descriptor** (`client_fd`).
	    - -> This socket is used **only for communication with that client**.

If an error occurs (`accept()` returns `-1`), it prints `"accept failed"` and continues the loop (so the server keeps running).

##### NOTE:
Each client gets its **own `client_fd`** to communicate with the server. Whereas `server_fd` is static to uniquely identify the server.  So think of a file descriptor as a unique token.

Imagine you’re at a **busy restaurant**, and a waiter is serving multiple customers.

If the waiter **writes the order on the same notepad page for every customer**, the new order will overwrite the previous one!

Instead, the waiter **gives each customer their own paper** to write their order (just like `malloc()` gives each client their own memory). Now, each waiter (thread - discussed later) knows which order belongs to which customer.
<br/>

```c
    pthread_t thread_id;
    pthread_create(&thread_id, NULL, handle_client, (void *)client_fd);
    pthread_detach(thread_id);
  }
} // terminating our while loop
```

Why do we need thread? Well basically with this HTTP server, we are planning to let multiple users connect to our server concurrently, and threads helps us do that.
```c
pthread_create(&thread_id, NULL, handle_client, (void *)client_fd);
```
- Think of a **thread** like a new worker at a restaurant.
- Each time a new client connects, we **hire a new worker** to serve that client.
- The worker (thread) runs the `handle_client()` function to talk to the client. We'll be writing this function later in the blog.
- We give the worker `client_fd`, so it knows which customer to serve.
```c
pthread_detach(thread_id);
```
- Once the worker (thread) is done serving the client, we don’t need them anymore.
- Instead of waiting around for the boss (server) to say "you can go now" (`pthread_join`), we let the worker **clean up automatically** when done.
- `pthread_detach` makes sure the thread doesn’t waste memory after finishing.
<br/>
---
<br/>
## Understanding `handle_client()`

Now lets understand the `handle_client()` function. It helps to process an HTTP request from a client, extracts the requested file name, determines its type (extension), generates an HTTP response, and sends it back to the client.

```c
void *handle_client(void *arg) {
    int client_fd = *((int *)arg);
    char *buffer = (char *)malloc(BUFFER_SIZE * sizeof(char));

    ssize_t bytes_received = recv(client_fd, buffer, BUFFER_SIZE, 0);
    if (bytes_received > 0) {
        regex_t regex;
        regcomp(&regex, "^GET /([^ ]*) HTTP/1", REG_EXTENDED);
        regmatch_t matches[2];

        if (regexec(&regex, buffer, 2, matches, 0) == 0) {
            buffer[matches[1].rm_eo] = '\0';
            const char *url_encoded_file_name = buffer + matches[1].rm_so;
            char *file_name = url_decode(url_encoded_file_name);

            char file_ext[32];
            strcpy(file_ext, get_file_extension(file_name));

            char *response = (char *)malloc(BUFFER_SIZE * 2 * sizeof(char));
            size_t response_len;
            build_http_response(file_name, file_ext, response, &response_len);

            send(client_fd, response, response_len, 0);

            free(response);
            free(file_name);
        }
        regfree(&regex);
    }
    close(client_fd);
    free(arg);
    free(buffer);
    return NULL;
}

```
Lets understand this code line by line:
```c
void *handle_client(void *arg) {
```
- This function is designed to be run in a separate thread (`pthread`), which is why it takes `void *arg` as input and returns `NULL`.
- The argument (`arg`) is expected to be a pointer to a client file descriptor.
```c
int client_fd = *((int *)arg);
```
- Since  `arg` is a `client_fd` and while creating thread using `pthread_create` we can only pass client_fd of type `(void *)`, so we typecast it back to `(int *)`.
- In the while loop of `main()` function we used malloc to allocate memory for `client_fd` so it is obviously a pointer which is why we de-structure it to get the actual value.
```c
// allocate buffer for incoming data
char *buffer = (char *)malloc(BUFFER_SIZE * sizeof(char));
```
- We allocate memory to store the client’s request data.
- `BUFFER_SIZE` defines the amount of memory reserved for the incoming request.
```c
// receive request from client
ssize_t bytes_received = recv(client_fd, buffer, BUFFER_SIZE, 0);
```
- `recv()` is a [system call](https://man7.org/linux/man-pages/man2/recv.2.html) coming from `<sys/socket.h>` header and is used to receive messages from a socket.
- It returns the number of bytes received. So if `bytes_received > 0`, it means we received a valid request.

<div className="example">
### <u>HTTP GET Request Example:</u>
**Note:** Before moving ahead, this is how a simple HTTP GET request looks like:
```c
GET /hello.txt HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9
Connection: keep-alive
```
</div>

<br/>
```c
// checking if request is a GET request
regex_t regex;
regcomp(&regex, "^GET /([^ ]*) HTTP/1", REG_EXTENDED);
regmatch_t matches[2];
```
- We use **regular expressions** to check if the request is a `GET` request.
- `regcomp()` compiles the regex pattern to extract the requested file name from the HTTP request.
- `matches` is an array that will store the matched parts. `matches[0]` holds the entire matched string, like `"GET /hello.txt HTTP/1.1"`. Whereas `matches[1]` holds the first captured group, which is the actual filename (`"/hello.txt"`).
```c
if (regexec(&regex, buffer, 2, matches, 0) == 0) {
```
- `regexec()` checks if the request matches our regex pattern.
- If it matches, we extract the filename.
<br/>
Now below snippet is actually an interesting one to understand that made me scratch my head. So I want to take a minute to explain this one so that you don't scratch your head and waste time.
```c
buffer[matches[1].rm_eo] = '\0';
const char *url_encoded_file_name = buffer + matches[1].rm_so;
char *file_name = url_decode(url_encoded_file_name);
```
I used following [resource](https://www.gnu.org/software/libc/manual/html_node/Regexp-Subexpressions.html) to understand the above snippet and below is my understanding:
<br/>
Lets say our buffer value is
```c
"GET /hello%20world.txt HTTP/1.1"
```
Now going through the code one by one
```c
buffer[matches[1].rm_eo] = '\0';
```
- `matches[1].rm_eo` is the **end index** of the filename inside `buffer`.
- By setting `buffer[matches[1].rm_eo] = '\0'`, we **cut off** everything **after** the filename to make it a proper C string.
- This ensures that when we extract the filename, it doesn’t include extra HTTP request details like `" HTTP/1.1"`.
```c
const char *url_encoded_file_name = buffer + matches[1].rm_so;
```
- `matches[1].rm_so` is the **start index** of the filename inside `buffer`.
- `buffer + matches[1].rm_so` creates a **pointer** that points to the start of the filename inside `buffer`.
- This means `url_encoded_file_name` now holds only the **filename part** of the request.
```c
char *file_name = url_decode(url_encoded_file_name);
```
- `url_encoded_file_name` still contains URL-encoded characters (`%20` instead of space).
- We pass it to `url_decode()`, which converts `%20` into spaces and returns the actual filename. We'll write this function later in the blog.
- The final value in `file_name` is a properly formatted filename.

So a simple walkthrough will be like -
```c
"GET /hello%20world.txt HTTP/1.1" // value of buffer
```

```c
matches[1].rm_so = 5;   // start of "hello%20world.txt"
matches[1].rm_eo = 22;  // end (space before "HTTP/1.1")
```

```c
buffer[matches[1].rm_eo] = '\0';
// "GET /hello%20world.txt\0HTTP/1.1"
```
So now, `"hello%20world.txt"` is a valid C string inside `buffer`.
```c
const char *url_encoded_file_name = buffer + matches[1].rm_so;
// `buffer + 5` now points to "hello%20world.txt"
```

```c
char *file_name = url_decode(url_encoded_file_name);
// url_decode("hello%20world.txt") returns "hello world.txt"
```
Therefore we successfully extract our filename that is `hello world.txt`. I hope you understood this part, if you didn't - go through it again or just keep this in mind that we basically have a request from which we extract the file name for further processing.
<br/>
Now moving ahead,
```c
char file_ext[32];
strcpy(file_ext, get_file_extension(file_name));
```
- We extract the file’s extension (e.g., `.html`, `.jpg`, `.css`) using a function `get_file_extension()` which we will write later in the blog.
- This helps determine the correct **MIME type** for the response.
```c
// building HTTP response
char *response = (char *)malloc(BUFFER_SIZE * 2 * sizeof(char));
size_t response_len;
build_http_response(file_name, file_ext, response, &response_len);
```
- Allocate memory for the response.
- `response_len` stores the size of the response
- `build_http_response()` constructs an HTTP response based on the requested file and its type. We'll write this function later in the blog.
```c
send(client_fd, response, response_len, 0);
```
- Sends the generated response back to the client.
- `send()` takes `sockfd`, response data, response length and a flag which is used to send behaviours but is not really needed here in this case.

Now lets do little memory cleaning 🧹
```c
            free(response);
            free(file_name);
        }
        regfree(&regex);
    }
    close(client_fd);
    free(arg);
    free(buffer);
    return NULL;
```
We now free all the resources and close our client connection.
<br/>

---

## Understanding `build_http_response()`

Now we'll go through `build_http_response()` function and see how do we actually create a response that we'll send to back to the client.
```c
void build_http_response(const char *file_name,
                        const char *file_ext,
                        char *response,
                        size_t *response_len) {

    const char *mime_type = get_mime_type(file_ext);
    char *header = (char *)malloc(BUFFER_SIZE * sizeof(char));
    snprintf(header, BUFFER_SIZE,
             "HTTP/1.1 200 OK\r\n"
             "Content-Type: %s\r\n"
             "\r\n",
             mime_type);

    int file_fd = open(file_name, O_RDONLY);
    if (file_fd == -1) {
        snprintf(response, BUFFER_SIZE,
                 "HTTP/1.1 404 Not Found\r\n"
                 "Content-Type: text/plain\r\n"
                 "\r\n"
                 "404 Not Found");
        *response_len = strlen(response);
        return;
    }

    struct stat file_stat;
    fstat(file_fd, &file_stat);
    off_t file_size = file_stat.st_size;

    *response_len = 0;
    memcpy(response, header, strlen(header));
    *response_len += strlen(header);

    ssize_t bytes_read;
    while ((bytes_read = read(file_fd,
                            response + *response_len,
                            BUFFER_SIZE - *response_len)) > 0) {
        *response_len += bytes_read;
    }
    free(header);
    close(file_fd);
}
```
So this function **constructs an HTTP response** by:
1. Determining the **MIME type** based on the file extension.
2. Attempting to **open the requested file**.
3. If the file exists, it **reads the file contents** and appends it to the response.
4. If the file is missing, it **returns a 404 error response**.

```c
const char *mime_type = get_mime_type(file_ext);
```
- Calls `get_mime_type(file_ext)` to get the correct **MIME type** (e.g., `"text/html"` for `.html`)
- We'll see the implementation of this function further in the blog post.

<div className="example">
### <u>HTTP Response Header Example:</u>
Now before moving ahead, lets see how a HTTP response header actually looks like:
```c
HTTP/1.1 status_code status_message\r\n
Content-Type: mime_type\r\n
Other-Headers: values\r\n
\r\n
```
So for example:
```c
HTTP/1.1 200 OK\r\n
Content-Type: text/html\r\n
Content-Length: 1024\r\n
\r\n
```
- `HTTP/1.1 200 OK` → HTTP version and status code
- `Content-Type: text/html` → Tells the browser it's an HTML file
- `Content-Length: 1024` → Indicates the size of the body
- `\r\n\r\n` → Marks the end of the headers
</div>

<br/>

As we saw in the above example, we try to replicate the same header format and using `snprintf()` function so that we can redirect the output in `header` variable. How? lets see
```c
	char *header = (char *)malloc(BUFFER_SIZE * sizeof(char));
	snprintf(header, BUFFER_SIZE,
	         "HTTP/1.1 200 OK\r\n"
	         "Content-Type: %s\r\n"
	         "\r\n",
	         mime_type);
```
- Allocates memory for `header` (this will store HTTP headers).
- **Formats an HTTP response header** indicating **status `200 OK`** and its **content type**.

Example Output:
```c
HTTP/1.1 200 OK
Content-Type: text/html
```
Now moving forward,
```c
    int file_fd = open(file_name, O_RDONLY);
    if (file_fd == -1) {
        snprintf(response, BUFFER_SIZE,
                 "HTTP/1.1 404 Not Found\r\n"
                 "Content-Type: text/plain\r\n"
                 "\r\n"
                 "404 Not Found");
        *response_len = strlen(response);
        free(header);
        return;
    }
```
- **Tries opening the requested file** in read-only mode.
- If it **fails** (file not found), we build a 404 response and we return it without any further processing.
```c
// get file size for Content-Length
struct stat file_stat;
fstat(file_fd, &file_stat);
off_t file_size = file_stat.st_size;
```
- Uses `fstat()` to **get file size** before reading.
```c
// copying header to response buffer
*response_len = 0;
memcpy(response, header, strlen(header));
*response_len += strlen(header);
```
- Copies the header into `response` using [`memcpy()`](https://www.tutorialspoint.com/c_standard_library/c_function_memcpy.htm) and updates `response_len` to track the total size.
```c
	ssize_t bytes_read;
	while ((bytes_read = read(file_fd,
	                        response + *response_len,
	                        BUFFER_SIZE - *response_len)) > 0) {
	    *response_len += bytes_read;
	}
```
This looks scary to understand at first but trust me it is not.
This loop reads the requested file in chunks and appends its content to the `response` buffer. Thats it really!

Lets understand whats going on with the code:

- `read(file_fd, response + *response_len, BUFFER_SIZE - *response_len)`:

    - Reads up to `(BUFFER_SIZE - *response_len)` bytes from `file_fd`.
    - Stores the data **at the end** of the response buffer (`response + *response_len`).
    - `read()` returns the number of bytes read (`bytes_read`).
- **If `read()` succeeds (`bytes_read > 0`)**:

    - We update `*response_len` to track the total response size.
    - The loop continues to read more data until the entire file is read.
- **When the file is fully read (`read()` returns 0)**:

    - The loop stops, meaning the response buffer now contains both the HTTP headers and the file content.

We do the cleaning now 🧹
```c
free(header);
close(file_fd); // closes the file to avoide resource leak
```
<br/>

---
## ⛳ Checkpoint
***Well, if you've made it this far, give yourself a pat on the back!***
<br/>
We've covered the core of our HTTP server, and the hardest part is behind us. Not too bad, right?

Moving forward we just have few helper functions to write that are used in client handling and response generation like
- `url_decode()` - will help us convert a URL-encoded filename into a normal string (e.g., `%20` → space)
- `get_mime_type()` - will help us determine the correct MIME type based on the file extension (e.g., `.html` → `text/html`)
- `get_file_extension()` - will help us extract the file extension from the filename (e.g., `index.html` → `.html`)
<br/>
---

## Understanding `url_decode()`
So URLs can’t contain certain special characters like spaces, so they are encoded using a `%` followed by two hexadecimal digits representing their ASCII value.

For example:

- Space (`' '`) → `%20`
- Exclamation (`'!'`) → `%21`
- Slash (`'/'`) → `%2F`

To process such URLs correctly, we need a function that **detects encoded characters and converts them back**.
```c
char *url_decode(const char *src) {
    size_t src_len = strlen(src);
    char *decoded = malloc(src_len + 1);
    size_t decoded_len = 0;

    for (size_t i = 0; i < src_len; i++) {
        if (src[i] == '%' && i + 2 < src_len) {
            int hex_val;
            sscanf(src + i + 1, "%2x", &hex_val);
            decoded[decoded_len++] = hex_val;
            i += 2;
        } else {
            decoded[decoded_len++] = src[i];
        }
    }

    decoded[decoded_len] = '\0';
    return decoded;
}
```
Lets understand the code snippet attached above in little depth even though its not that complex to understand
```c
char *decoded = malloc(src_len + 1);
```
- Here we basically allocate memory for the decoded url and it uses `src_len + 1` to make space for the null terminator (`\0`).
- Even though the decoded string will usually be **shorter** than the encoded one, allocating the same length is a simple and safe choice.

Now we write a loop that basically loops (duh) through each character of the url
```c
    for (size_t i = 0; i < src_len; i++) {
        if (src[i] == '%' && i + 2 < src_len) {
            int hex_val;
```
it finds a `%` in the url, and looks ahead **two** more characters to ensure a valid hex sequence (`i + 2 < src_len` prevents out-of-bounds errors).
```c
sscanf(src + i + 1, "%2x", &hex_val);
```
This is the most interest part
- It reads the **two characters** after `%` and treats them as a **hexadecimal number**.
- `"%2x"` tells `sscanf` to read **exactly two** hex digits and store the result in `hex_val`.
- For example, if `src` contains `%20`, `sscanf` reads `"20"` and converts it to `32`, which is the ASCII code for a **space** (`' '`).
```c
decoded[decoded_len++] = hex_val;
i += 2;
```
After decoding the hex value, we store it and since we processed three characters `%xx`, we skip ahead

Now if the character isn't part of an encoded sequence, we simply copy it as is
```c
decoded[decoded_len++] = src[i];
```
and at the end we make sure our string is properly terminated by appending `\0`
<br/>

---

## Understanding `get_mime_type()`

```c
const char *get_mime_type(const char *file_ext) {
    if (strcasecmp(file_ext, "html") == 0 || strcasecmp(file_ext, "htm") == 0) {
        return "text/html";
    } else if (strcasecmp(file_ext, "txt") == 0) {
        return "text/plain";
    } else if (strcasecmp(file_ext, "jpg") == 0 || strcasecmp(file_ext, "jpeg") == 0) {
        return "image/jpeg";
    } else if (strcasecmp(file_ext, "png") == 0) {
        return "image/png";
    } else {
        return "application/octet-stream";
    }
}
```
Now this I believe is fairly simple to understand, it basically compares the `file_ext` parameter that comes by `get_file_extension()` function (which we will look into after this function) and check whether it is a html file, txt file, jpg, or png file. Accordingly we return the `Content-Type` which will be used in our HTTP  response header part.
<br/>
One thing I wanted to talk about is the fallback MIME type which is `application/octet-stream`.

Well it is basically a MIME type that is used for binary files with an unknown file type. It tells the client (like a web browser) to **download** the file instead of trying to display it.

- `"text/html"` → Rendered as a webpage
- `"image/png"` → Displayed as an image
- `"application/octet-stream"` → Browser **downloads** the file instead of opening it
<br/>

---

## Understanding `get_file_extension()`

The `get_file_extension(file_name)` function extracts and returns the file extension from a given file name.

Here `file_name` can be anything like `image.png`, `document.txt`, `.gitignore`;
```c
const char *get_file_extension(const char *file_name) {
    const char *dot = strrchr(file_name, '.');
    if (!dot || dot == file_name) {
        return "";
    }
    return dot + 1;
}
```
(yes, thats all. no rocket science here)

```c
const char *dot = strrchr(file_name, '.');
```
Finds the last occurrence of `'.'` in `file_name` using [`strrchr()`](https://cplusplus.com/reference/cstring/strrchr/).
If no `'.'` is found, `dot` is `NULL`
```c
if (!dot || dot == file_name) {
	return "";
}
```
Checks if `dot` is NULL (no `'.'` found) or if `dot` is at the start (e.g., `.hiddenfile`, which has no valid extension).
Returns an empty string (`""`) if there's no valid extension.
```c
return dot + 1;
```
Returns the file extension (everything after `'.'`)
<br/>

---
# Well done!! 👏

Now lets test it out. Before we do, create some files in the same directory like `index.html` and `test.txt`. Download any jpg or png image you want from the internet and save in the same directory.

<img src="https://i.imgur.com/IECrnV5.png" width="300" />

(I added few `printf` in `handle_client()` function to debug and monitor my requests and response. If you want to do so as well, you can go to the github repo I linked at the end of the blog and copy from there)

Now once you have you files ready, you can compile your c code using
```bash
gcc -o http_server http_server.c
```
You should be seeing the output "Server listening on port 8080"

<img src="https://i.imgur.com/ASAhBk8.png" width="400" />

If you see this then congrats, your http server is up and running. To test it, visit `http://localhost:8080/index.html` or other files you created.

<img src="https://i.imgur.com/gO7j19F.png" width="600" />

<img src="https://i.imgur.com/JRjn0WB.png" width="600" />
<img src="https://i.imgur.com/0oEYVvg.png" width="600"/>
Cool right? now with the `printf` statement, you should be seeing all the response and requests on your terminal
<img src="https://i.imgur.com/po8DrRJ.png" width="600"/>
<br/>
<img src="https://i.imgur.com/mvmXnZ0.png" width="600"/>

Now if you want to test from your terminal, you can use `curl` and still be seeing response generated. Try it out.

```bash
curl -v http://localhost:8080/test.txt
```

Additionally you can use `netcat` to manually send an HTTP request:
```bash
nc localhost 8080
GET /test.txt HTTP/1.1
```
<img src="https://i.imgur.com/1o31ILl.png" width="600"/>
see?? man this is so cool 😭
I'm sorry, im as excited as you are seeing it work lol
<br/>

---
## Tools and their respective header files

Now as promised, here is a list of tools we used in the entire code base and what header files they come from:

- **Networking (`sys/socket.h`, `netinet/in.h`, `arpa/inet.h`)**

    - Used to create, bind, listen, and accept client connections over TCP.
    - `socket()`, `bind()`, `listen()`, `accept()`, `send()`, `recv()`.
- **File Handling (`fcntl.h`, `sys/stat.h`, `sys/types.h`, `unistd.h`)**

    - Used for reading requested files and handling file metadata.
    - `open()`, `read()`, `close()`, `fstat()`.
- **Multithreading (`pthread.h`)**

    - Handles multiple client requests simultaneously.
    - `pthread_create()`, `pthread_detach()`.
- **String Manipulation (`string.h`, `ctype.h`)**

    - Used for parsing HTTP requests and handling filenames.
    - `strcpy()`, `strchr()`, `strcasecmp()`, `strlen()`, `memcpy()`.
- **Regular Expressions (`regex.h`)**

    - Extracts file paths from HTTP GET requests.
    - `regcomp()`, `regexec()`, `regfree()`.
- **Memory Management (`stdlib.h`)**

    - Allocates and frees memory dynamically.
    - `malloc()`, `free()`.
- **Error Handling (`errno.h`, `stdio.h`)**

    - Used for logging errors and debugging.
    - `perror()`, `printf()`.
<br/>
---
<br/>
And that’s a wrap! You just built your own HTTP server from scratch in C. Pretty cool, right? Now you’ve got something solid to show off.

I hope this blog was genuinely useful and helped you understand the logic behind the code rather than just copy-pasting. If you have any questions, check out the resources I used while writing this.

You can also reach out to me on [X (formerly Twitter)](https://x.com/puangg59).
<br/>
A big shoutout to [Jeffrey Yu](https://dev.to/jeffreythecoder) and their blog on [How I Built a Simple HTTP Server from Scratch using C](https://dev.to/jeffreythecoder/how-i-built-a-simple-http-server-from-scratch-using-c-739). It is a great resource that helped me understand the code and thought process behind building this.

If you want to dive into the code, you can check out the GitHub repository here: **[GitHub Repo Link](https://github.com/puang59/http-server)**

<br/>

---
## Resources Used

<div className="quote">
- [RFC 7231 HTTP](https://www.rfc-editor.org/rfc/rfc7231)
- [HTTP Sessions](https://developer.mozilla.org/en-US/docs/Web/HTTP/Session)
- [Multithreading in C](https://www.geeksforgeeks.org/multithreading-in-c/)
- [Socket Programming in C](https://www.geeksforgeeks.org/socket-programming-cc/)
- [unistd.h](https://pubs.opengroup.org/onlinepubs/7908799/xsh/unistd.h.html)
- [Regexp Subexpressions](https://www.gnu.org/software/libc/manual/html_node/Regexp-Subexpressions.html)
- [Google Search](https://www.google.com/)
</div>
