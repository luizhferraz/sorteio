using Microsoft.AspNetCore.Mvc;

namespace NumberDrawingApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DrawingController : ControllerBase
{
    private static HashSet<int> DrawnNumbers = new();
    private static List<int> DrawnNumbersHistory = new();
    private const int MaxNumber = 300;

    [HttpGet("draw")]
    public IActionResult DrawNumber()
    {
        if (DrawnNumbers.Count >= MaxNumber)
        {
            return BadRequest("All numbers have been drawn");
        }

        var random = new Random();
        int number;
        do
        {
            number = random.Next(1, MaxNumber + 1);
        } while (DrawnNumbers.Contains(number));

        DrawnNumbers.Add(number);
        DrawnNumbersHistory.Add(number);
        
        return Ok(new { 
            number = number, 
            remainingNumbers = MaxNumber - DrawnNumbers.Count,
            history = DrawnNumbersHistory
        });
    }

    [HttpPost("reset")]
    public IActionResult Reset()
    {
        DrawnNumbers.Clear();
        DrawnNumbersHistory.Clear();
        return Ok(new { message = "All numbers have been reset" });
    }

    [HttpGet("history")]
    public IActionResult GetHistory()
    {
        return Ok(new { history = DrawnNumbersHistory });
    }
}