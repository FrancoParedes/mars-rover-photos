This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Run Application in Local

First, run the development server

```bash
npm install
npm run dev
```
&nbsp;

Also, in a second terminal start the mocks server
```bash
npm run stubby
```

- Local: http://localhost:3000
- Production: https://mars-rover-photos-one.vercel.app/
  &nbsp;
___
## Environment Variables

I know that environment variables should not be uploaded to the code but this is just for a demo.

For run project with mocks

.env.local
```
NEXT_PUBLIC_NASA_HOST=http://localhost:8882
NEXT_PUBLIC_NASA_API_KEY=test
```
For run project with real data

.env.local
```
NEXT_PUBLIC_NASA_HOST=https://api.nasa.gov
NEXT_PUBLIC_NASA_API_KEY=SWt4dkoncNjtDY7VxRfXtgwdm67pg5v8ahwVdxw7

```

