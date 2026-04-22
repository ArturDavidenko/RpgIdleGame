using IdleRpgApi.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace IdleRpgApi.Infrastructure.Persistence
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Inventory> Inventories { get; set; }
        public DbSet<InventoryItem> InventoryItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(u => u.Id);

                entity.Property(u => u.Email)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(u => u.UserName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(u => u.PasswordHash)
                    .IsRequired();

                entity.HasIndex(u => u.Email)
                    .IsUnique();

                entity.HasIndex(u => u.UserName)
                    .IsUnique();
            });

            modelBuilder.Entity<Inventory>(entity =>
            {
                entity.HasKey(i => i.Id);

                entity.Property(i => i.UserId)
                    .IsRequired();

                entity.Property(i => i.CreatedAt)
                    .IsRequired();

                entity.HasOne(i => i.User)
                    .WithOne(u => u.Inventory)
                    .HasForeignKey<Inventory>(i => i.UserId);
            });

            modelBuilder.Entity<InventoryItem>(entity =>
            {
                entity.HasKey(ii => ii.Id);

                entity.Property(ii => ii.DefinitionId)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(ii => ii.X).IsRequired();
                entity.Property(ii => ii.Y).IsRequired();

                entity.Property(ii => ii.Quantity);
                entity.Property(ii => ii.Rarity)
                    .HasMaxLength(50);

                entity.HasOne(ii => ii.Inventory)
                    .WithMany(i => i.Items)
                    .HasForeignKey(ii => ii.InventoryId);
            });
        }
    }
}
