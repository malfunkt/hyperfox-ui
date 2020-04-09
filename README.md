# Hyperfox UI

`hyperfox-ui` is a frontend application for [hyperfox][1], a web traffic
inspection tool.

## Buildig

### Pre-requisites

* [Node.js v12](https://nodejs.org/en/)

### Setup

Use `make setup` to download

```
make setup
```

### Development

Start [Hyperfox][1] in develoment mode and disable the bundled graphical
interface:

```
hyperfox --headless --dev-mode --database dev.db
```

Start Hyperfox-UI:

```
make start
```

You should the able to see Hyperfox UI at http://127.0.0.1:3000.

A quick way to simulate traffic is by sending a specially crafted HTTP request
to [hyperfox][1] containing a `Host` header:

```
curl -H 'Host: example.org' http://127.0.0.1:1080
```

Once you're done with development use `make test` to run tests.

```
make test
```

## Creating a production build

Use `make build` to prepare a production build:

```
make build
```

In order to export this build and bundle it into [hyperfox][1] you'll
need the `statik` tool:

```
go get github.com/rakyll/statik
```

First make sure you have a copy of hyperfox's source code in the same level
hyperfox-ui is:

```
cd ..
git clone https://github.com/malfunkt/hyperfox.git
```

Then go back to `hyperfox-ui` and use `make statik`:

```
cd hyperfox-ui
make statik
```

that will create a `../hyperfox/ui/statik/statik.go` file containing a
compressed version of the contents of the `./build` directory.

## License

> Copyright (c) 2019-today José Nieto, https://xiam.io
>
> Permission is hereby granted, free of charge, to any person obtaining
> a copy of this software and associated documentation files (the
> "Software"), to deal in the Software without restriction, including
> without limitation the rights to use, copy, modify, merge, publish,
> distribute, sublicense, and/or sell copies of the Software, and to
> permit persons to whom the Software is furnished to do so, subject to
> the following conditions:
>
> The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
> NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
> LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
> OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
> WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[1]: https://github.com/malfunkt/hyperfox
