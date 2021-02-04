using System;
using System.Collections.Generic;

namespace TestTaskApp.Domain.Entities
{
    public class Product
    {
        public Guid ProductId { get; set; }

        public string ProductName { get; set; }

        public string Version { get; set; }

        public int Size { get; set; }

        public string CompanyName { get; set; }

        public string URL { get; set; }

        public string VendorContact { get; set; }

        public DateTime ReleasedOn { get; set; }

        public List<Category> Categories { get; set; } = new List<Category>();
    }
}
