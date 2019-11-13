using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OnboardingTask.Models
{
    public partial class Products
    {
        public Products()
        {
            Sales = new HashSet<Sales>();
        }

        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public decimal Price { get; set; }

        public virtual ICollection<Sales> Sales { get; set; }
    }
}
