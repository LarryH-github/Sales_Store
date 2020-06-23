using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace OnboardingTask.Models
{
    public partial class OnboardingTaskDatabaseContext : DbContext
    {
        public OnboardingTaskDatabaseContext()
        {
        }

        public OnboardingTaskDatabaseContext(DbContextOptions<OnboardingTaskDatabaseContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Customers> Customers { get; set; }
        public virtual DbSet<Products> Products { get; set; }
        public virtual DbSet<Sales> Sales { get; set; }
        public virtual DbSet<Stores> Stores { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                //optionsBuilder.UseSqlServer("Server=DESKTOP-PS9HAA5;Database=OnboardingTaskDatabase;Trusted_Connection=True;");
                optionsBuilder.UseSqlServer("Server=tcp:onboarding-task-server.database.windows.net,1433;Initial Catalog=OnboardingTaskDatabase;Persist Security Info=False;User ID=OnboardingTaskLogin;Password=myAzureMicroservicePassword;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customers>(entity =>
            {
                entity.Property(e => e.Address).HasMaxLength(200);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Products>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Price).HasColumnType("decimal(18, 0)");
            });

            modelBuilder.Entity<Sales>(entity =>
            {
                entity.Property(e => e.DateSold).HasColumnType("date");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Sales)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK_Sales_Customers");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Sales)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_Sales_Products");

                entity.HasOne(d => d.Store)
                    .WithMany(p => p.Sales)
                    .HasForeignKey(d => d.StoreId)
                    .HasConstraintName("FK_Sales_Stores");
            });

            modelBuilder.Entity<Stores>(entity =>
            {
                entity.Property(e => e.Address).HasMaxLength(200);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
