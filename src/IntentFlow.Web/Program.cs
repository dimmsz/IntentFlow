using IntentFlow.Core;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<IntentParser>();
var app = builder.Build();
app.UseDefaultFiles();
app.UseStaticFiles();

app.MapPost("/api/parse", (ParseRequest request, IntentParser parser) =>
{
    if (string.IsNullOrWhiteSpace(request.Text)) return Results.BadRequest(new { error = "text is required" });
    return Results.Ok(parser.Parse(request.Text));
});
app.Run();

public sealed record ParseRequest(string Text);