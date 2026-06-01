using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IdleRpgApi.Migrations
{
    /// <inheritdoc />
    public partial class AddInventoryDimensions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Height",
                table: "Inventories",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Width",
                table: "Inventories",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Height",
                table: "Inventories");

            migrationBuilder.DropColumn(
                name: "Width",
                table: "Inventories");
        }
    }
}
