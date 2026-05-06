using IdleRpgApi.Application.Common.Extensions;
using IdleRpgApi.Application.InventoryModule;
using IdleRpgApi.Application.InventoryModule.Commands;
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
        private readonly IInventoryCommandService _commandService;

        public InventoryController(IInventoryService inventoryService, IInventoryCommandService commandService)
        {
            _inventoryService = inventoryService;
            _commandService = commandService;
        }

        [HttpGet]
        public async Task<ActionResult<InventoryDto>> Get()
        {
            var userId = User.GetUserId();

            var inventory = await _inventoryService.GetStashInventoryAsync(userId);

            return Ok(inventory);
        }

        [HttpPost]
        public async Task<IActionResult> Save([FromBody] InventoryDto dto)
        {
            var userId = User.GetUserId();

            await _inventoryService.SaveAsync(userId, dto);

            return Ok();
        }

        [HttpPost("command")]
        public async Task<IActionResult> ExecuteCommand([FromBody] InventoryCommandDto command)
        {
            var userId = User.GetUserId();

            var result = await _commandService.ExecuteAsync(command, userId);

            return Ok(result);
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
