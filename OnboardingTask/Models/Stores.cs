using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OnboardingTask.Models
{
    public partial class Stores
    {
        public Stores()
        {
            Sales = new HashSet<Sales>();
        }

        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Address { get; set; }

        public virtual ICollection<Sales> Sales { get; set; }
    }
}
