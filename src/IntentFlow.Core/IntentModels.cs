namespace IntentFlow.Core;

public enum IntentType { Unknown, AddShoppingItem, RemoveShoppingItem, CreateReminder }

public sealed record IntentItem(string Name);

public sealed record IntentCommand(IntentType Intent, IReadOnlyList<IntentItem> Items, string? OriginalText, double Confidence);