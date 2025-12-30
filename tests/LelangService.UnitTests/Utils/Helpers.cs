

using System.Security.Claims;

namespace LelangService.UnitTests.Utils
{
    public class Helpers
    {
        public static ClaimsPrincipal GetClaimsPrincipals()
        {
            var claims = new List<Claim> { new Claim(ClaimTypes.Name, "test") };
            var identity = new ClaimsIdentity(claims, "testing");
            return new ClaimsPrincipal(identity);
        }
    }
}
