import uvicorn

if __name__ == '__main__':
    uvicorn.run('config:app', host='localhost', port=3000,reload=True)