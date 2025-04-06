---
title: "How I use emacs org-mode"
date: "2023-04-14"
---

A few years ago, I began using GNU Emacs because I was inspired by the adoration for org-mode within the Emacs community and how creatively they utilized it.
I couldn't resist trying out this beautiful piece of software for myself.

I have since made Emacs org-mode my primary method of taking notes and sharing them with my friends through my Nginx server, which serves my files
directly via this website's file route.

### Here's How I Do It

Whenever I want to take quick notes, I launch Emacs and press `C-c o`, which creates an org file named `newFile.org` in the directory `~/orgfiles/`.
If the file already exists, it will ask you whether you want to overwrite it or not.

`C-c o` is my custom keybind in `config.el` and is written like:

```elisp
(defun create-and-open-org-file ()
  (interactive)
  (let ((file-path (concat (file-name-as-directory (expand-file-name "~/orgfiles")) "newFile.org")))
    (when (file-exists-p file-path)
      (if (y-or-n-p "File already exists. Overwrite? ")
          (delete-file file-path)
        (error "File creation aborted")))
    (find-file file-path)))

(global-set-key (kbd "C-c o") 'create-and-open-org-file)
```

You can then simply take your notes in this file, and once you are done, you can export it as an HTML file simply by pressing `SPC m e`, which will show you
all the options you have to export your org file.
Here, since we want to export as an HTML file, we press `h h`

Now that we have an HTML file exported, we are ready to serve it on our server. I have an Nginx server running on my VPS that automatically indexes
files on my website's `\files` route (so basically, you can view all my files at `https://puang.in/files`).
To do this, you can add this code to your Nginx configuration file with your directories and routes:

```nginx
location /files/ {
    alias /var/www/puangwebsite/files/;
    autoindex on;
}
```

Now, here comes the magical part. Currently, I have my HTML file on my local machine. Somehow, I want to push that file to my VPS and into the `/var/www/puangwebsite/files/`
directory. For this, I'm going to use the Secure Copy Protocol (SCP) to send files from my local machine to my VPS.

```bash
scp ~/orgfiles/newfile.html <username>@<ip_address>:/var/www/puangwebsite/files/
```

And voila, your `newfile.html` is pushed to your VPS. Since we have autoindex enabled for the directory `/var/www/puangwebsite/files`, it will automatically create a route
to that file. So, you just have to access it using `http://<your_website>.<tld>/files/newfile.html` — in my case, `https://puang.in/files/newfile.html`.
Now, simply share your notes with your friends :)

Now, you might be thinking that whenever you create a quick org file with the keybind `C-c o`, it will always have the same name, `newFile.org`, and will
be exported as `newfile.html` every time, right? So, when I push again and again, won't my previous notes be overwritten? Also, typing the `scp` command
again and again is very tedious — who would even waste their time doing so?

You are correct, but hold on. This is where my custom `zshrc` config comes into play. I wrote a function called `stream` in my shell script.
When I call this function with a filename as an argument, it does two things. First, it creates a new file with the provided filename in the
`/var/www/puangwebsite/files/` directory on my VPS. Then, it copies the content of `newfile.html` from my local machine and pastes it into the newly
created file on my VPS. This allows me to easily transfer content from my local machine to my VPS with just one command.

```bash
stream() {
    if [ $# -eq 1 ]; then
        src_file="$HOME/orgfiles/newfile.html"
        dest_file="<username>@<ip_address>:/var/www/puangwebsite/files/$1.html"
        scp "$src_file" "$dest_file"
    else
        echo "Usage: stream new_filename"
    fi
}
```

Usage:

```bash
> stream emacsTest
```

and BAMM!!, I have my quick org note file served directly at `https://puang.in/files/emacsTest.html`

### So basically

- Launch emacs
- Press `C-c o` to create an org file
- Write whatever in the orgfile created
- Press `SPC m e hh` to export `.org` file to `.html`
- Type `stream <filename>` in terminal
- Thats it!!! Your notes is ready to serve

### File Preview

So when you visit `https://puang.in/files/emacsTest.html`, you will see the same content that you wrote in your org file.

At this point you are pretty much done, but if you are not impressed with the raw look of
your notes then you can easily write a simple css file for it because at the end of the day,
you are exporting your org file is a plain HTML text right?
To link your css file with your org file, you can easily put this on top of your org file when editing:

```js
#+HTML_HEAD: <link rel="stylesheet" type="text/css" href="your_css.css" />
```

If you dont want to write your own css, then you can use pre-written once
Checkout: [org-html-themes](https://github.com/fniessen/org-html-themes?tab=readme-ov-file)

If you want to know more about my setup, you can DM me on X - [@puangg59](https://twitter.com/puangg59)
