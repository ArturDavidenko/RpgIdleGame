using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IdleRpgApi.Migrations
{
    /// <inheritdoc />
    public partial class InventoryOwnedFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InventoryItems_Inventories_InventoryId",
                table: "InventoryItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_InventoryItems",
                table: "InventoryItems");

            migrationBuilder.RenameTable(
                name: "InventoryItems",
                newName: "InventoryItem");

            migrationBuilder.RenameIndex(
                name: "IX_InventoryItems_InventoryId",
                table: "InventoryItem",
                newName: "IX_InventoryItem_InventoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_InventoryItem",
                table: "InventoryItem",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_InventoryItem_Inventories_InventoryId",
                table: "InventoryItem",
                column: "InventoryId",
                principalTable: "Inventories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InventoryItem_Inventories_InventoryId",
                table: "InventoryItem");

            migrationBuilder.DropPrimaryKey(
                name: "PK_InventoryItem",
                table: "InventoryItem");

            migrationBuilder.RenameTable(
                name: "InventoryItem",
                newName: "InventoryItems");

            migrationBuilder.RenameIndex(
                name: "IX_InventoryItem_InventoryId",
                table: "InventoryItems",
                newName: "IX_InventoryItems_InventoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_InventoryItems",
                table: "InventoryItems",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_InventoryItems_Inventories_InventoryId",
                table: "InventoryItems",
                column: "InventoryId",
                principalTable: "Inventories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
