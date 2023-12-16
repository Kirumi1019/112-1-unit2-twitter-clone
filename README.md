# 112-1-WEB-Hw3
1. 先建立一個 `.env.local`於資料夾中，並與上課相同在裡面填上自己的URL。
2.  
```bash
yarn 
docker compose up -d
yarn migrate
yarn dev
```
(執行之前，可以先把自己的 pg-data 刪除，避免奇怪的報錯，如果有問題可以考慮用用看這個看有沒有用
```bash
sudo service postgresql stop
```
)

### 介紹：
大多基本要求皆有達成，lint 用起來應該也沒問題，若有少完成的部份，可以考慮留下一點建議給我這個還弄不太明白的菜鳥，相當感謝！
（p.s. 輸入送出後，或是點擊進去，反應都會有一點點慢，但這部份不確定是不是自己的設備問題，或是本來應該就長這樣）