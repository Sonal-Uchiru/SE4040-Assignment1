using FluentValidation;

namespace backend_server.Middlewares;

public class ValidationHandler
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ValidationHandler> _logger;

    public ValidationHandler(RequestDelegate next, ILogger<ValidationHandler> logger)
    {
        _next = next ?? throw new ArgumentNullException(nameof(next));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // Check if there's a validator associated with the request's model type
        var modelType = context.Request.RouteValues["controller"]?.ToString();
        var validatorType = Type.GetType($"YourNamespace.{modelType}Validator");

        if (validatorType != null)
        {
            // Deserialize the request body to the model type
            var requestBody = await new StreamReader(context.Request.Body).ReadToEndAsync();
            var model = Newtonsoft.Json.JsonConvert.DeserializeObject(requestBody, validatorType.GenericTypeArguments[0]);
       
            // Use FluentValidation to validate the model
            var validator = Activator.CreateInstance(validatorType);
            var validationResult = (validator as IValidator)?.Validate((IValidationContext)model);

            if (validationResult?.IsValid == false)
            {
                // If validation fails, return a 400 Bad Request response with validation errors
                var errors = validationResult.Errors.Select(error => new { error.PropertyName, error.ErrorMessage });
                var errorMessage = new { Message = "Validation failed", Errors = errors };
                var json = Newtonsoft.Json.JsonConvert.SerializeObject(errorMessage);

                context.Response.StatusCode = 400;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(json);
                return;
            }
        }

        // If there's no validator or validation passes, continue to the next middleware
        await _next(context);
    }
}

