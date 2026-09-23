# IntentFlow

自然言語からアプリ操作（Intent / Command）を抽出するための実験用Webアプリ。

初期版は外部AI APIを使わず、ルールベースで日本語の買い物発話を解析します。

## ブラウザで試す

GitHub Pages に静的Web版を公開できます。

- URL: https://dimmsz.github.io/IntentFlow/
- 入力例: 「トイレットペーパーと卵が切れそう」
- 「解析する」を押すと Intent と items が表示されます。
- マイクボタンでは対応ブラウザの音声認識を利用します。
- 買い物リストはブラウザの LocalStorage に保存されます。

静的版では解析処理をブラウザ内の JavaScript で実行するため、ASP.NET Core のサーバーは不要です。

## 開発

ASP.NET Core版も残してあります。

    dotnet run --project src/IntentFlow.Web

IntentFlow.Core は将来のネイティブアプリから再利用するための解析コアです。
