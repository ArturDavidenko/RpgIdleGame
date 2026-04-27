using IdleRpgApi.Application.Common.Extensions;
using IdleRpgApi.Application.InventoryModule;
using IdleRpgApi.Application.InventoryModule.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IdleRpgApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class InventoryController : ControllerBase
    {
        private readonly IInventoryService _inventoryService;

        public InventoryController(IInventoryService inventoryService)
        {
            _inventoryService = inventoryService;
        }

        [HttpGet]
        public async Task<ActionResult<InventoryResponse>> Get()
        {
            var userId = User.GetUserId();

            var inventory = await _inventoryService.GetByUserIdAsync(userId);

            var response = new InventoryResponse
            {
                Id = "stash",
                Items = inventory.Items,
            };

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Save([FromBody] InventoryDto dto)
        {
            var userId = User.GetUserId();

            await _inventoryService.SaveAsync(userId, dto);

            return Ok();
        }

        [HttpPost("random-item")]
        public async Task<IActionResult> GenerateRandomItem()
        {
           var userId = User.GetUserId();

           var result = await _inventoryService.AddRandomItemAsync(userId);

           return Ok(result);
        }
    }
}
