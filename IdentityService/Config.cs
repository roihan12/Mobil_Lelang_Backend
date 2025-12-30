using Duende.IdentityServer.Models;

namespace IdentityService
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> IdentityResources =>
            new IdentityResource[]
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
            };

        public static IEnumerable<ApiScope> ApiScopes =>
            new ApiScope[]
            {
                new ApiScope("lemobilApp", "Lemobil full access"),
            };

        public static IEnumerable<Client> Clients(IConfiguration config) =>
            new Client[]
            {

               new Client
               {
                   ClientId = "postman",
                   ClientName = "Postman",
                   AllowedScopes = {"openid", "profile", "lemobilApp" },
                   RedirectUris = {"https://www.getpostman.com/oauth2/callback" },
                   ClientSecrets= new [] { new Secret("postmanSecret".Sha256()) },
                   AllowedGrantTypes = GrantTypes.ResourceOwnerPassword


               },
               new Client
               {
                   ClientId = "nextApp",
                   ClientName = "NextApp",
                   AllowedScopes = {"openid", "profile", "lemobilApp" },
                   RedirectUris = {config["ClientApp"] + "/api/auth/callback/id-server"},
                   ClientSecrets= new [] { new Secret("secret".Sha256()) },
                   AllowedGrantTypes = GrantTypes.CodeAndClientCredentials,
                   RequirePkce = false,
                   AllowOfflineAccess = true,
                   AccessTokenLifetime = 3600*24*30,
                   AlwaysIncludeUserClaimsInIdToken = true,

               }
            };
    }
}
