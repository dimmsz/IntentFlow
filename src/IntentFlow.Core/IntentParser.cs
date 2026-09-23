namespace IntentFlow.Core;

public sealed class IntentParser
{
    private static readonly string[] ShoppingTriggers =
    ["買わなきゃ","買わないと","買って","買う","購入","なくなった","なくなりそう","切れた","切れそう","足りない","足りなくなりそう","必要"];

    private static readonly string[] KnownItems =
    ["トイレットペーパー","ティッシュ","キッチンペーパー","マヨネーズ","ケチャップ","醤油","しょうゆ","味噌","みそ","卵","たまご","牛乳","コーヒー","パン","米","お米","洗剤","食器用洗剤","シャンプー","リンス","歯磨き粉","歯ブラシ","ゴミ袋","ラップ","アルミホイル","シリコンスプレー"];

    public IntentCommand Parse(string text)
    {
        if (string.IsNullOrWhiteSpace(text)) return new(IntentType.Unknown, [], text, 0);
        var items = KnownItems.Where(x => text.Contains(x, StringComparison.OrdinalIgnoreCase))
            .Select(NormalizeItem).Distinct().Select(x => new IntentItem(x)).ToList();
        var shopping = ShoppingTriggers.Any(x => text.Contains(x, StringComparison.OrdinalIgnoreCase));
        if (items.Count > 0 && shopping) return new(IntentType.AddShoppingItem, items, text, .95);
        if (items.Count > 0) return new(IntentType.AddShoppingItem, items, text, .70);
        return new(IntentType.Unknown, [], text, .10);
    }

    private static string NormalizeItem(string item) => item switch
    {
        "たまご" => "卵", "お米" => "米", "しょうゆ" => "醤油", "みそ" => "味噌", _ => item
    };
}